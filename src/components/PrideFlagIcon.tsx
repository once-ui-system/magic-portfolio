import React from "react";

interface PrideFlagIconProps extends React.ComponentProps<'img'> {
  }
  const PrideFlagIcon: React.FC<PrideFlagIconProps> = (props) => (
  <img
    src="/images/about/AboriginalFlag.svg"
    alt="LGBTQIA+ Pride Flag"
    width="24"
    height="24"
    {...props}
  />
);

export default PrideFlagIcon;
