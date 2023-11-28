export type Post = {
  who: string;
  comment: string;
  photo: string;
  likes: number;
};

export type Posts = Record<string, Post>;

export type Achievement = {
  title: string;
  description: string;
  progress: string;
};

export type Achievements = Record<string, Achievement>;

export type Reward = {
  title: string;
  type: string;
  amount: number;
};

export type Rewards = Record<string, Reward>;

export type UserType = {
  id: number;
  name: string;
  lastName: string;
};

export type ProfileOptionsProps = {
  isFullScreenVisible: boolean;
  setFullScreenVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedContent: React.Dispatch<React.SetStateAction<string>>;
};

export type FullScreenModalProps = {
  content: string;
  isVisible: boolean;
  onClose: () => void;
  setFullScreenVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Credentials = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  error: string;
  [key: string]: string; // This is the index signature
};
