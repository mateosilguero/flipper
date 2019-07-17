/**
 * Copyright 2018-present Facebook.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * @format
 * @flow strict-local
 */

import {FlipperPlugin, FlexColumn} from 'flipper';
import SearchBar from './components/SearchBar';

type State = {||};

type Data = {||};

type NavigationEvent = {|
  date: Date,
  uri: ?String,
|};

type PersistedState = {|
  navigationEvents: [NavigationEvent],
|};

export default class extends FlipperPlugin<State, {}, PersistedState> {
  static title = 'Navigation';
  static id = 'Navigation';
  static icon = 'directions';
  static keyboardActions = ['clear'];

  static defaultPersistedState: PersistedState = {
    navigationEvents: [],
  };

  static persistedStateReducer = (
    persistedState: PersistedState,
    method: string,
    payload: Object,
  ): $Shape<PersistedState> => {
    switch (method) {
      case 'nav_event':
        return {
          ...persistedState,
          navigationEvents: [
            ...persistedState.navigationEvents,
            {uri: payload.uri, date: new Date()},
          ],
        };
      default:
        return {
          ...persistedState,
        };
    }
  };

  onKeyboardAction = (action: string) => {
    if (action === 'clear') {
      this.props.setPersistedState({data: []});
    }
  };

  navigateTo = (query: string) => {
    this.getDevice().then(device => {
      device.navigateToLocation(query);
    });
  };

  render() {
    return (
      <FlexColumn>
        <SearchBar
          onNavigate={this.navigateTo}
          onFavorite={(query: string) => {}}
        />
      </FlexColumn>
    );
  }
}

/* @scarf-info: do not remove, more info: https://fburl.com/scarf */
/* @scarf-generated: flipper-plugin index.js.template 0bfa32e5-fb15-4705-81f8-86260a1f3f8e */