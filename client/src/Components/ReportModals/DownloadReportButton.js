import React, { useState } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { AiOutlineDownload } from 'react-icons/ai';
import DownloadReport from './DownloadReport';
import '../../App.css';

const DownloadReportButton = () => {
  const [downloadReportModel, setDownloadReportModel] = useState(false);

  return (
    <>
      <Button
        id="fluid_btn"
        className="custom_cta download_reports text-uppercase px-4"
        onClick={() => setDownloadReportModel(true)}
      >
        <AiOutlineDownload
          style={{ marginTop: '-5px', marginRight: '5px' }}
          size="20"
          color="#fff"
        />
        Reports
      </Button>
      <UncontrolledTooltip placement="bottom" target="fluid_btn">
        Download Reports
      </UncontrolledTooltip>
      {downloadReportModel ? (
        <DownloadReport
          open={downloadReportModel}
          close={() => setDownloadReportModel(false)}
        />
      ) : null}
    </>
  );
};

export default DownloadReportButton;
