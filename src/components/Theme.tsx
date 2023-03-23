import { useMantineColorScheme } from "@mantine/core";
import { FC } from "react";

type Props = {
  children?: React.ReactNode
};

export const Theme: FC<Props> = ({children}) => {
  const { colorScheme } = useMantineColorScheme();
  
  return (
    <div className={colorScheme}>
      <div className="text-slate-900 dark:text-white bg-white dark:bg-zinc-900">
        {children}
      </div>
    </div>
  );
};