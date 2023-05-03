export interface User {
  id: number;
  email: string;
  mobileNo: string;
  role: string;
  fullName: string;
  skillSet: SkillSet;
  experience:number;
  active: boolean;
  availability: string;
  languages: string;
  designation: string;
  rate: number;
  displayPic: string;
  zoomLink: string;
  mentorFiles: MentorFiles;
}

export interface MentorFiles{
  photo: any;
  resume: any;
  resumeFileType: string;
  resumeFileName: string;
  photoFileName: string;
  photoFileType: string;
}

export interface SkillSet {
  id: any;
  skillSetName: string;
  relatedTechnologies: string;
  active: boolean;
}
