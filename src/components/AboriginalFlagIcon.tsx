import React from "react";

interface AboriginalFlagIconProps extends React.ComponentProps<'img'> {
  }
  const AboriginalFlagIcon: React.FC<AboriginalFlagIconProps> = (props) => (
  <img
    src="/images/about/AboriginalFlag.svg"
    alt="Australian Aboriginal Flag"
    width="24"
    height="24"
    {...props}
  />
);

export default AboriginalFlagIcon;
