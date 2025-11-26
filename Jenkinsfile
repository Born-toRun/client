pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = "${DOCKERHUB_CREDENTIALS_USR}/b2r-client"
        NEXT_PUBLIC_BACKEND_URL = 'https://born-to-run.kro.kr:8443'
        CONTAINER_NAME = 'b2r-client'
        HOST_PORT = '3000'
        CONTAINER_PORT = '3000'
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🔨 Building Docker image...'
                script {
                    sh """
                        docker buildx build \
                            --platform linux/arm64/v8 \
                            --build-arg NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL} \
                            -t ${DOCKER_IMAGE}:latest \
                            -t ${DOCKER_IMAGE}:${BUILD_NUMBER} \
                            -f docker/Dockerfile \
                            . \
                            --load
                    """
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo '📤 Pushing to Docker Hub...'
                script {
                    sh """
                        echo \$DOCKERHUB_CREDENTIALS_PSW | docker login -u \$DOCKERHUB_CREDENTIALS_USR --password-stdin
                        docker push ${DOCKER_IMAGE}:latest
                        docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}
                    """
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                echo '🚀 Deploying to server...'
                script {
                    sh """
                        # 기존 컨테이너 중지 및 제거
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true

                        # 새 이미지 pull
                        docker pull ${DOCKER_IMAGE}:latest

                        # 새 컨테이너 실행
                        docker run -d \
                            --name ${CONTAINER_NAME} \
                            --restart unless-stopped \
                            -p ${HOST_PORT}:${CONTAINER_PORT} \
                            ${DOCKER_IMAGE}:latest

                        # 컨테이너 상태 확인
                        sleep 5
                        docker ps | grep ${CONTAINER_NAME}
                    """
                }
            }
        }

        stage('Cleanup Old Images') {
            steps {
                echo '🧹 Cleaning up old images...'
                script {
                    sh """
                        # dangling 이미지 제거
                        docker image prune -f
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build and deployment successful!'
            script {
                discordNotify(
                    webhookURL: "${B2R_DEPLOY_DISCORD}",
                    title: "🚀 Client Jenkins 빌드 성공",
                    description: "배포가 성공적으로 완료되었습니다.",
                    result: "SUCCESS",
                    customUsername: "Jenkins Bot"
                )
            }
        }
        failure {
            echo '❌ Build or deployment failed!'
            script {
                discordNotify(
                    webhookURL: "${B2R_DEPLOY_DISCORD}",
                    title: "❌ Client Jenkins 빌드 실패",
                    description: "배포 중 오류가 발생했습니다.",
                    result: "FAILURE",
                    customUsername: "Jenkins Bot"
                )
            }
        }
        always {
            echo '🔒 Logging out from Docker Hub...'
            sh 'docker logout || true'
        }
    }
}
