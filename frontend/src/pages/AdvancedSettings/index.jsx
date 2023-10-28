import React from 'react';

import { useSelector } from 'react-redux';
import { selectCurrentLang } from '@/redux/lang/selectors';

import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import CrudModule from '@/modules/CrudModule';
import AdvancedSettingsForm from '@/forms/AdvancedSettingsForm';

export default function AdvancedSettings() {
  const entity = 'setting';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['name'];

  const readColumns = [
    {
      title: 'Setting Name',
      dataIndex: 'settingKey',
    },
    {
      title: 'Value',
      dataIndex: 'settingValue',
    },
    {
      title: 'enabled',
      dataIndex: 'enabled',
    },
    {
      title: 'Core Setting',
      dataIndex: 'isCoreSetting',
    },
  ];
  const dataTableColumns = [
    {
      title: 'Setting Name',
      dataIndex: 'settingKey',
    },
    {
      title: 'Value',
      dataIndex: 'settingValue',
      render: (text, row) => {
        return `${text}`;
      },
    },
    {
      title: 'enabled',
      dataIndex: 'enabled',
      key: 'enabled',
      onCell: (record, rowIndex) => {
        return {
          props: {
            style: {
              width: '60px',
            },
          },
        };
      },
      render: (_, record) => {
        return (
          <Switch
            disabled={record.isCoreSetting}
            checked={record.enabled}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        );
      },
    },
  ];

  const lang = useSelector(selectCurrentLang);

  const Labels = {
    PANEL_TITLE: lang.settings,
    DATATABLE_TITLE: lang.settings_list,
    ADD_NEW_ENTITY: lang.add_new_settings,
    ENTITY_NAME: lang.setting,
    CREATE_ENTITY: lang.save,
    UPDATE_ENTITY: lang.update,
    RECORD_ENTITY: lang.record_payment,
  };

  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return (
    <CrudModule
      createForm={<AdvancedSettingsForm />}
      updateForm={<AdvancedSettingsForm isUpdateForm={true} />}
      config={config}
    />
  );
}