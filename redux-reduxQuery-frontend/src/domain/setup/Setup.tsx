import { useSetupToken } from "@/services/auth/hooks/useToken";

type Props = {
  children: React.ReactNode;
};

export function Setup({ children }: Props) {
  useSetupToken();

  return <>{children}</>;
}
