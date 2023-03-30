export type User = {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  uiTheme: "light" | "dark";
};

export type SignUpBody = Omit<
  User,
  "id" | "createdAt" | "updatedAt" | "uiTheme"
>;
