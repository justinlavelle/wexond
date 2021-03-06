import { observer } from 'mobx-react';
import * as React from 'react';

import NavigationDrawerItem from '../NavigationDrawerItem';
import {
  Root,
  Header,
  Search,
  SearchIcon,
  Input,
  Title,
  Divider,
} from './styles';

interface Props {
  title?: string;
  search?: boolean;
  children?: any;
  onSearch?: (str?: string) => void;
}

@observer
export default class extends React.Component<Props, {}> {
  public static Item = NavigationDrawerItem;

  public static Divider = Divider;

  public input: HTMLInputElement;

  private typingTimer: any;

  private onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onSearch } = this.props;
    if (typeof onSearch !== 'function') return;

    clearTimeout(this.typingTimer);

    if (e.key === 'Enter') {
      onSearch(this.input.value);
    } else {
      this.typingTimer = setTimeout(() => {
        onSearch(this.input.value);
      }, 500);
    }
  };

  private onBlur = () => {
    const { onSearch } = this.props;
    if (typeof onSearch !== 'function') return;

    onSearch(this.input.value);
  };

  public render() {
    const { title, search, children } = this.props;

    return (
      <Root>
        {(title != null || search) && (
          <Header>
            {(search && (
              <Search>
                <SearchIcon />
                <Input
                  innerRef={r => (this.input = r)}
                  placeholder="Search"
                  onKeyDown={this.onKeyDown}
                  onBlur={this.onBlur}
                />
              </Search>
            )) ||
              (title != null && <Title>{title}</Title>)}
          </Header>
        )}

        {children}
      </Root>
    );
  }
}
