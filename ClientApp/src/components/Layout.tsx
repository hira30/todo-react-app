import { ReactNode } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <NavMenu />
      <Container>{children}</Container>
    </div>
  );
};
