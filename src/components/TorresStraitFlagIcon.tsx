import React from "react";

interface TorresStraitFlagIconProps extends React.ComponentProps<'img'> {
  }
  const TorresStraitIslanderFlagIcon: React.FC<TorresStraitFlagIconProps> = (props) => (
  <img
    src="/images/about/TorresStraitIslanderFlag.svg"
    alt="Torres Strait Islander Flag"
    width="24"
    height="24"
    {...props}
  />
);

export default TorresStraitIslanderFlagIcon;
