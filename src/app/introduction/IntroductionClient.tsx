"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Heart,
  MapPin,
  MapPinned,
  Smartphone,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

// Animated Section Wrapper
function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function IntroductionClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section - Split Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMCAxYy0zLjg2NiAwLTctMy4xMzQtNy03czMuMTM0LTcgNy03IDcgMy4xMzQgNyA3LTMuMTM0IDctNyA3eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6"
            >
              <Zap className="w-4 h-4" />
              <span>러닝으로 시작하는 건강한 습관</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              혼자가 아닌,
              <br />
              <span className="text-amber-300">함께 달리는 즐거움</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              4자리 출석 코드 인증과 마라톤 챌린지로 당신의 러닝 목표를
              달성하세요.
              <br />
              같은 목표를 가진 크루원들과 함께라면 더 멀리 달릴 수 있습니다.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/"
                className="group px-8 py-4 bg-white text-emerald-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                지금 시작하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/crew"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                크루 둘러보기
              </Link>
            </motion.div>

            {/* Features Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
            >
              {[
                { icon: "👥", label: "다양한 크루" },
                { icon: "🏃", label: "함께 달리기" },
                { icon: "🎯", label: "목표 달성" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-white/80 text-sm md:text-base font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Bar */}
      <AnimatedSection className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-gray-500"
          >
            <motion.div
              variants={fadeIn}
              className="flex items-center gap-2 text-sm md:text-base"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>4자리 코드 기반 출석 인증</span>
            </motion.div>
            <motion.div
              variants={fadeIn}
              className="flex items-center gap-2 text-sm md:text-base"
            >
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>마라톤 완주 챌린지</span>
            </motion.div>
            <motion.div
              variants={fadeIn}
              className="flex items-center gap-2 text-sm md:text-base"
            >
              <Users className="w-5 h-5 text-blue-500" />
              <span>활발한 크루 커뮤니티</span>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Problem-Solution Section */}
      <AnimatedSection className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            {/* Problem */}
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <span className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-6">
                이런 경험 있으신가요?
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                혼자 달리기는 너무 외롭고 지루해요
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                작심삼일로 끝나는 러닝, 동기부여가 부족해 포기하게 되는 목표,
                <br />
                함께할 사람이 없어 더욱 힘든 러닝...
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium mb-6">
                Born to Run의 해답
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                함께라서 더 오래 달릴 수 있어요
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                같은 목표를 가진 크루원들과 함께 달리며 서로 응원하고,
                <br />
                4자리 코드 출석 인증으로 꾸준한 습관을 만들어보세요.
              </p>
            </motion.div>

            {/* Solution Cards */}
            <motion.div
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: Users,
                  title: "함께하는 동기부여",
                  description:
                    "크루원들과 함께 달리며 서로 응원하고 격려합니다.",
                  color: "blue",
                },
                {
                  icon: MapPin,
                  title: "출석 코드 인증",
                  description:
                    "4자리 랜덤 코드 입력으로 공정한 출석을 인증합니다.",
                  color: "emerald",
                },
                {
                  icon: Trophy,
                  title: "목표 달성의 기쁨",
                  description:
                    "마라톤 챌린지를 완주하며 성취감을 경험합니다.",
                  color: "amber",
                },
              ].map((solution, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-${solution.color}-100 flex items-center justify-center mb-6`}
                  >
                    <solution.icon
                      className={`w-7 h-7 text-${solution.color}-600`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600">{solution.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Features Showcase - Bento Grid */}
      <AnimatedSection className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium mb-6">
              주요 기능
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              러닝을 더 즐겁게 만드는 기능들
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              출석 코드 인증부터 마라톤 챌린지까지, 당신의 러닝 라이프를 완벽하게
              지원합니다.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {/* Large Feature Card */}
            <motion.div
              variants={scaleIn}
              className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-10 text-white relative overflow-hidden"
            >
              <div className="relative z-10">
                <MapPin className="w-12 h-12 mb-6" />
                <h3 className="text-3xl font-bold mb-4">출석 코드 인증</h3>
                <p className="text-white/90 text-lg mb-6 max-w-md">
                  모임마다 생성되는 4자리 랜덤 코드를 입력하여 출석을 인증하는 간편하고 공정한 시스템입니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    4자리 랜덤 코드
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    간편한 입력
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    공정한 인증
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </motion.div>

            {/* Regular Feature Cards */}
            {[
              {
                icon: Trophy,
                title: "마라톤 챌린지",
                description: "전국의 마라톤 일정을 미리 살펴보고 풀/하프/10K 코스를 완주하며 성취감을 경험하세요.",
                gradient: "from-amber-500 to-orange-600",
              },
              {
                icon: Activity,
                title: "실시간 러닝 기록",
                description: "거리, 시간, 속도를 실시간으로 기록하고 분석합니다.",
                gradient: "from-blue-500 to-indigo-600",
              },
              {
                icon: Users,
                title: "크루 커뮤니티",
                description: "같은 목표를 가진 사람들과 함께 달리며 성장합니다.",
                gradient: "from-purple-500 to-pink-600",
              },
              {
                icon: Calendar,
                title: "출석 캘린더",
                description: "한눈에 보는 나의 출석 현황과 러닝 히스토리.",
                gradient: "from-green-500 to-emerald-600",
              },
              {
                icon: Award,
                title: "달성 배지",
                description: "목표를 달성하며 받는 다양한 배지와 리워드.",
                gradient: "from-red-500 to-rose-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`bg-gradient-to-br ${feature.gradient} rounded-3xl p-8 text-white relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <feature.icon className="w-10 h-10 mb-4" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/90">{feature.description}</p>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* How It Works - Timeline */}
      <AnimatedSection className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
              시작하기
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              3단계로 시작하는 러닝 라이프
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              간단한 가입부터 크루 참여까지, 쉽고 빠르게 시작할 수 있습니다.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {[
              {
                step: "01",
                title: "회원가입",
                description:
                  "카카오 로그인으로 간편하게 가입하고 프로필을 설정하세요.",
                icon: Smartphone,
                color: "emerald",
              },
              {
                step: "02",
                title: "크루 찾기",
                description:
                  "내 주변의 크루를 찾거나, 관심사가 맞는 크루에 가입하세요.",
                icon: MapPinned,
                color: "blue",
              },
              {
                step: "03",
                title: "함께 달리기",
                description:
                  "크루 활동에 참여하고, 출석 코드를 입력하여 인증하며 목표를 달성하세요.",
                icon: Target,
                color: "amber",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative flex flex-col md:flex-row gap-6 mb-12 last:mb-0"
              >
                {/* Step Number & Icon */}
                <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-${step.color}-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
                  >
                    {step.step}
                  </div>
                  <div
                    className={`hidden md:block w-1 flex-1 bg-gradient-to-b from-${step.color}-200 to-transparent mt-6 ${index === 2 ? "opacity-0" : ""}`}
                  ></div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-${step.color}-100 flex items-center justify-center flex-shrink-0`}
                    >
                      <step.icon
                        className={`w-6 h-6 text-${step.color}-600`}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-emerald-600 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              지금 바로 시작하기
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Marathon Feature Deep Dive */}
      <AnimatedSection className="py-20 md:py-32 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-6">
                  마라톤 챌린지
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  목표를 향한
                  <br />
                  여정을 함께
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  풀 마라톤 42.195km, 하프 마라톤 21.0975km, 10K 코스까지.
                  <br />
                  크루원들과 함께 조금씩 거리를 쌓아가며 완주의 감동을
                  경험하세요.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      title: "풀 마라톤",
                      distance: "42.195km",
                      color: "red",
                    },
                    {
                      title: "하프 마라톤",
                      distance: "21.0975km",
                      color: "orange",
                    },
                    {
                      title: "10K 코스",
                      distance: "10km",
                      color: "yellow",
                    },
                  ].map((course, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className={`flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border-l-4 border-${course.color}-500`}
                    >
                      <div className="flex items-center gap-3">
                        <Trophy
                          className={`w-6 h-6 text-${course.color}-500`}
                        />
                        <span className="font-semibold text-gray-900">
                          {course.title}
                        </span>
                      </div>
                      <span className="text-gray-600 font-medium">
                        {course.distance}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/crew"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-full font-semibold text-sm whitespace-nowrap shadow-lg hover:bg-amber-600 transition-all duration-300 hover:scale-105"
                  >
                    챌린지 시작하기
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/running"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-full font-semibold text-sm whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-amber-200"
                  >
                    <Activity className="w-4 h-4" />
                    러닝 기록 보기
                  </Link>
                </div>
              </div>

              {/* Visual */}
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white/80 text-sm">진행률</span>
                      <span className="text-white font-bold text-lg">68%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "68%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="bg-white h-full rounded-full"
                      ></motion.div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "누적 거리", value: "28.5 km" },
                      { label: "남은 거리", value: "13.6 km" },
                      { label: "참여 인원", value: "45명" },
                      { label: "완주 예정", value: "8일 후" },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                      >
                        <div className="text-white/70 text-sm mb-1">
                          {stat.label}
                        </div>
                        <div className="text-white font-bold text-xl">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -z-10 -inset-4 bg-gradient-to-br from-amber-200 to-orange-200 rounded-3xl blur-3xl opacity-50"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Social Proof Section */}
      <AnimatedSection className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-6">
              크루원들의 이야기
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              함께 달려 더 행복합니다
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Born to Run과 함께 목표를 달성한 크루원들의 생생한 경험담을
              들어보세요.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {[
              {
                name: "김러너",
                role: "서울 강남 러닝크루",
                avatar: "🏃‍♂️",
                content:
                  "혼자 달리다 포기하기를 반복했는데, 크루원들과 함께하니 어느새 10km를 완주할 수 있었어요. 출석 코드 인증 덕분에 꾸준히 참여하게 되더라구요!",
                rating: 5,
              },
              {
                name: "이달리기",
                role: "부산 해운대 마라톤크루",
                avatar: "🏃‍♀️",
                content:
                  "마라톤은 너무 먼 목표라고 생각했는데, 하루하루 조금씩 거리를 쌓다보니 하프 마라톤을 완주했어요. 함께 응원해준 크루원들에게 감사해요!",
                rating: 5,
              },
              {
                name: "박완주",
                role: "대구 달성 러닝클럽",
                avatar: "👟",
                content:
                  "직장인이라 시간 내기 어려웠는데, 출퇴근 시간에 맞춰 활동하는 크루를 찾아 참여했어요. 이제 러닝이 제 일상의 일부가 되었습니다!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Core Values Bar */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { icon: Heart, label: "함께 성장" },
              { icon: TrendingUp, label: "지속 가능한 습관" },
              { icon: Users, label: "활발한 커뮤니티" },
              { icon: Award, label: "목표 달성 지원" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Final CTA Section */}
      <AnimatedSection className="py-20 md:py-32 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMCAxYy0zLjg2NiAwLTctMy4xMzQtNy03czMuMTM0LTcgNy03IDcgMy4xMzQgNyA3LTMuMTM0IDctNyA3eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={scaleIn}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6"
            >
              <Zap className="w-4 h-4" />
              <span>지금 바로 시작하세요</span>
            </motion.div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              당신의 러닝 여정,
              <br />
              오늘 시작해보세요
            </h2>

            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Born to Run에서 같은 목표를 가진 크루원들을 만나고,
              <br />
              함께 달리며 건강한 습관을 만들어보세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/"
                className="group px-8 py-4 bg-white text-emerald-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                무료로 시작하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/crew"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                크루 둘러보기
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>무료 가입</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>카드 정보 불필요</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>언제든 시작 가능</span>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-white font-bold text-xl mb-4">
                Born to Run
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                함께 달리는 즐거움을 경험하세요.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors"
                  aria-label="Instagram"
                >
                  <span className="text-xl">📷</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors"
                  aria-label="Facebook"
                >
                  <span className="text-xl">📘</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors"
                  aria-label="Twitter"
                >
                  <span className="text-xl">🐦</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">바로가기</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/crew"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    크루 찾기
                  </Link>
                </li>
                <li>
                  <Link
                    href="/running"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    러닝 기록
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    피드
                  </Link>
                </li>
                <li>
                  <Link
                    href="/my-page"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    마이페이지
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4">고객지원</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    공지사항
                  </a>
                </li>
                <li>
                  <a href="/my-page/contact" className="hover:text-emerald-400 transition-colors">
                    문의하기
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    이용가이드
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4">약관 및 정책</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    이용약관
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    개인정보처리방침
                  </Link>
                </li>
                <li>
                  <Link
                    href="/policy"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    운영정책
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 text-sm text-gray-500 text-center">
            <p>© 2025 Born to Run. All rights reserved.</p>
            <p className="mt-2">
              함께 달리는 즐거움, 건강한 습관을 만드는 러닝 커뮤니티
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
