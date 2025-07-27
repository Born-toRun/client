// Crew 타입 정의
export interface Crew {
  id: number;
  crewName: string;
  contents: string;
  region: string;
  imageUri?: string;
  logoUri?: string;
  crewSnsUri?: string;
}

export interface CrewListResponse {
  details: Crew[];
}

export interface SignupFormData {
  userName: string;
  crewId: number | null;
  instagramId?: string;
}
