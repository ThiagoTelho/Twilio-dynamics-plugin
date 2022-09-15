import React from 'react';
import { AgentDesktopView, VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'CrmDynamicsPlugin';

export default class CrmDynamicsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);

    AgentDesktopView.defaultProps.splitterOptions = {
      initialFirstPanelSize: '450'
    };

    appConfig.logLevel = 'debug';
    /*appConfig.sso = {
      accountSid: "ACffca6c28c09a263c55824d86300300b4"
    };*/

    manager.updateConfig({
      colorTheme:{
        baseName: "FlexDark"
      }
    });


    const options = { sortOrder: -1 };
    flex.AgentDesktopView.Panel1.Content.add(<CustomTaskListContainer key="CrmDynamicsPlugin-component" />, options);
    
    flex.CRMContainer
  .defaultProps
  .uriCallback = (task) => task
  ? `https://trinus.crm2.dynamics.com=${task.attributes.name}`
  : "https://trinus.crm2.dynamics.com";

    flex.MainHeader.defaultProps.logoUrl = "https://gist.githubusercontent.com/ThiagoTelho/1d22be351e137d65045eeacfd97a7005/raw/0cce39441011db86c7fa41ea4d4e16e68760e7c7/2-Logo%2520Trinus%2520Co.svg";

  };

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
};

