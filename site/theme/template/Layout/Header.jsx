import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'bisheng/router';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { Collapse, Row, Col, Button} from 'antd';
import * as utils from '../utils';
import { version as antdVersion } from '../../../../package.json';
import ThemeColorForm from './ThemeColorForm';
import ThemeSizeForm from './ThemeSizeForm';

const Panel = Collapse.Panel;


export default class Header extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
  }

  render() {
    const { intl: { locale } } = this.context;
    const isZhCN = locale === 'zh-CN';
    const headerClassName = classNames({
      clearfix: true,
    });
    const menu = [
      <Button ghost size="small" onClick={this.handleLangChange} className="header-lang-button" key="lang-button">
        <FormattedMessage id="app.header.lang" />
      </Button>,
      <div className="header-lang-button" key="version-label">
        {'版本号: ' + antdVersion}
      </div>,
    ];

    return (
      <header id="header" className={headerClassName}>
        <Row>
          <Col xxl={4} xl={5} lg={5} md={6} sm={24} xs={24}>
            <Link to={utils.getLocalizedPathname('/', isZhCN)} id="logo">
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
            <ThemeColorForm/>
          </Panel>
        </Collapse>
      </header>
    );
  }
}

