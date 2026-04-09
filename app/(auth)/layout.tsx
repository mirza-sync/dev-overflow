const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="bg-auth-light dark:bg-auth-dark flex">{children}</main>;
};

export default AuthLayout;
