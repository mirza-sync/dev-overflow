const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="background-image-auth-light dark:background-image-auth-dark flex">{children}</main>;
};

export default AuthLayout;
