export type Tsession = {
  role: "admin" | "user";
  email: string;
  token: string;
  id: string;
};
