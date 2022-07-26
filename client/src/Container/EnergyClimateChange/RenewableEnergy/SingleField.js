/* eslint-disable react/forbid-prop-types */
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Input, FormGroup,
} from 'reactstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import { ErrorMessage } from 'formik';
import Api from '../../../Utils/api';
import { META_MATERIAL_ISSUE_DATA_ALLOWED_VALUES_LISTS_API } from '../../../Utils/apiList';

const SingleField = ({
  item, handleChange, values, foredit, segmentid,
  // setFieldValue,
}) => {
  const [list, setList] = useState([]);
  const getDropList = (app = null) => {
    Api.get(META_MATERIAL_ISSUE_DATA_ALLOWED_VALUES_LISTS_API, {
      action: 'filter',
      'filter-keys': `material_issue_data_key${app ? ',attribute_list' : ''}`,
      'filter-values': `"{""material_issue_id"":2,""data_key"":""${item.id.data_key}"",""material_issue_segment_id"":${segmentid}}"${app ? `,${app}` : ''}`,
    }).then(
      (res) => {
        setList(res.data.resource_list);
        // setFieldValue(item.id.data_key, '');
      },
      // eslint-disable-next-line no-unused-vars
      (err) => {
        setList([]);
        // setFieldValue(item.id.data_key, '');
      },
    );
  };

  useEffect(() => {
    if (item.attributes.data_value_validation_id === 'list_single' && item.dependent_parent.length === 0) {
      getDropList();
    } else {
      setList([]);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (foredit) {
      const haveToSend = item.dependent_parent.map((aa) => ({ [aa]: values[aa] }));
      const stringReq = JSON.stringify(haveToSend);
      const aa = (_.replace(stringReq, new RegExp('"', 'g'), '""'));
      getDropList(`"${aa}"`);
    } else if (item.dependent_parent.filter((i) => values[i]).length > 0) {
      const haveToSend = item.dependent_parent.map((aa) => ({ [aa]: values[aa] }));
      const stringReq = JSON.stringify(haveToSend);
      const aa = (_.replace(stringReq, new RegExp('"', 'g'), '""'));
      getDropList(`"${aa}"`);
    }
    // eslint-disable-next-line
  }, item.dependent_parent.map((i) => values[i]));

  return (
    <>
      {item.attributes.data_value_validation_id === 'list_single'
        ? (
          <FormGroup>
            <Input
              type="select"
              onChange={handleChange}
              name={item.id.data_key}
              defaultValue=""
            >
              <option value="">Select</option>
              {list.map((items) => (
                <option
                  value={items.id.data_value}
                  key={items.link}
                  selected={items.id.data_value === values[item.id.data_key]}
                >
                  {items.attributes.description}
                </option>
              ))}

            </Input>
          </FormGroup>
        )
        : (
          <FormGroup>
            <Input
              type="text"
              onChange={handleChange}
              name={item.id.data_key}
              value={values[item.id.data_key]}
            />
          </FormGroup>
        )}
      <ErrorMessage name={item.id.data_key} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
    </>
  );
};
SingleField.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  values: PropTypes.objectOf(PropTypes.any).isRequired,
  handleChange: PropTypes.func.isRequired,
  segmentid: PropTypes.number.isRequired,
  foredit: PropTypes.bool.isRequired,
  // setFieldValue: PropTypes.func.isRequired,
};

export default SingleField;
