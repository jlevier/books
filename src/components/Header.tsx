import { Search } from "./Search";
import { ActionIcon, Switch, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars, IconList, IconBorderAll } from '@tabler/icons-react';

interface HeaderProps {
  onViewChange: (isList: boolean) => void;
}

export const Header = ({ onViewChange }: HeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <div className="grid grid-cols-4 p-2.5 sticky top-0 z-50 bg-slate-100 dark:bg-zinc-800">
        <div className="flex gap-4">
          <div className="self-center">
            <Switch size="xl"
              onLabel={<IconBorderAll />}
              offLabel={<IconList />}
              onChange={x => onViewChange(x.currentTarget.checked)}
            />
          </div>
          <Search />
        </div>
        <div className="self-center justify-self-end col-span-3">
          <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
          </ActionIcon>
        </div>
      </div>
  );
}