import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { token } = useCurrentToken();

  return <div>{children}</div>;
}
