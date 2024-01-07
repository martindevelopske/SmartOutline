import { User } from "@prisma/client";

type tokenObj = {
  firstname: string;
  lastname: string;
  email: string;
  id: string;
};
type isTokenValidProps = {
  status: boolean;
  token: string | null;
  user?: User | null;
};
