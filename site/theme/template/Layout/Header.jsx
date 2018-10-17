import React from 'react';
import { Link } from 'bisheng/router';
import classNames from 'classnames';
import { Collapse, Row, Col } from 'antd';
import { version as antdVersion } from '../../../../package.json';
import ThemeColorForm from './ThemeColorForm';
// import ThemeSizeForm from './ThemeSizeForm';

const Panel = Collapse.Panel;


export default function Header() {
  const headerClassName = classNames({
    clearfix: true,
  });
  const menu = [
    <div className="header-lang-button" key="version-label">
      {`版本号: ${antdVersion}`}
    </div>,
  ];

  return (
    <header id="header" className={headerClassName}>
      <Row>
        <Col xxl={4} xl={5} lg={5} md={6} sm={24} xs={24}>
          <Link to="/components/button-cn/" id="logo">
            <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
            <img alt="Ant Design" src="https://gw.alipayobjects.com/zos/rmsportal/DkKNubTaaVsKURhcVGkh.svg" />
          </Link>
        </Col>
        <Col xxl={20} xl={19} lg={19} md={18} sm={0} xs={0}>
          {menu}
        </Col>
      </Row>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="定制主题颜色" key="1">
          <ThemeColorForm />
        </Panel>
      </Collapse>
    </header>
  );
}
