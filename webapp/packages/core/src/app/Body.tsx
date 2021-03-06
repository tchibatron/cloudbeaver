/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { observer } from 'mobx-react';
import styled, { css } from 'reshadow';

import { DialogsPortal } from '@dbeaver/core/dialogs';
import { useStyles, useTheme } from '@dbeaver/core/theming';

import { Main } from './Main';
import { Notifications } from './Notifications/Notifications';
import { TopNavBar } from './TopNavBar/TopNavBar';

const bodyStyles = css`
    container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
`;

export const Body = observer(function Body() {
  useTheme();

  return styled(useStyles(bodyStyles))(
    <container as="div">
      <TopNavBar />
      <Main />
      <DialogsPortal />
      <Notifications />
    </container>
  );
});
