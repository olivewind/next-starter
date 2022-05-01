declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.less' {
  const classes: { [className: string]: string };
  export default classes;
}

interface ILoginParams {
  username: string;
  password: string;
}
