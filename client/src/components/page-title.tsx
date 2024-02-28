import React from 'react';

type Props = {
   children: React.ReactNode;
};

export const PageTitle = ({ children }: Props) => {
   return <h2 className="font-semibold text-xl">{children}</h2>;
};

export default PageTitle;
