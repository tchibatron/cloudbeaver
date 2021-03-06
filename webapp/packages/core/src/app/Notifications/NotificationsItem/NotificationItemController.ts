/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { observable } from 'mobx';

import { IInitializableController, injectable } from '@dbeaver/core/di';
import { CommonDialogService } from '@dbeaver/core/dialogs';
import { ENotificationType, INotification } from '@dbeaver/core/eventsLog';

import { ErrorDetailsDialog } from './ErrorDetailsDialog/ErrorDetailsDialog';

const FadeTimeout = 5000;

@injectable()
export class NotificationItemController implements IInitializableController {
  closeAfter = 0;
  @observable isDetailsDialogOpen = false;
  private notification!: INotification;

  constructor(private commonDialogService: CommonDialogService) {}

  init(notification: INotification) {
    this.notification = notification;

    if (this.notification.details) {
      this.handleShowDetails = this.showDetails.bind(this);
    }

    if (notification.type !== ENotificationType.Error) {
      this.closeAfter = FadeTimeout;
    }
  }

  handleShowDetails?: () => void;

  handleClose = () => {
    if (!this.notification) {
      return;
    }
    this.notification.close();
  }

  private async showDetails() {
    this.isDetailsDialogOpen = true;
    try {
      this.notification.showDetails();
      await this.commonDialogService.open(ErrorDetailsDialog, this.notification.details!);
    } finally {
      this.isDetailsDialogOpen = false;
    }
  }
}
