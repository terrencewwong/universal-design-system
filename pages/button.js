import React from 'react'
import styled, { css, injectGlobal, ThemeProvider } from 'styled-components'

injectGlobal`
  html, body {
    margin: 0;
  }
`

const SwitchGroup = styled.div`
  display: flex;
  margin-bottom: 16px;

  .switch:not(:last-child) {
    margin-right: 8px;
  }
`

const Switch = styled.button.attrs({
  className: 'switch'
})`
  background-color: ${props => props.active ? '#10aded' : 'transparent'};
  border: ${props => props.active ? '1px solid #10aded' : '1px solid black'};
  color: ${props => props.active ? '#fff' : 'inherit'};
  cursor: pointer;
  font-family: sans-serif;
  font-size: 16px;
  height: 32px;
  outline: none;
  padding: 4px 16px;
`

const BUTTON_THEMES = {
  'antd': {
    defaultStyles: css`
      border-radius: 4px;
      border: 1px solid rgb(217, 217, 217);
      color: rgba(0, 0, 0, .65);
      cursor: pointer;
      font-family: sans-serif;
      font-size: 14px;
      font-weight: 400;
      height: 32px;
      line-height: 21px;
      padding: 0 15px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

      &:hover {
        border: 1px solid rgb(64, 169, 255);
        color: rgb(64, 169, 255);
      }
    `,
    type: {
      primary: css`
        background-color: #1890ff;
        border-color: #1890ff;
        color: #fff;

        &:hover {
          background-color: #40a9ff;
          border-color: #40a9ff;
          color: #fff;
        }
      `
    }
  },

  'bloom': {
    defaultStyles: css`
      -webkit-font-smoothing: antialiased;
      background-color: rgb(56, 56, 56);
      border-radius: 2px;
      border: 1px solid rgb(56, 56, 56);
      color: rgb(255, 255, 255);
      cursor: pointer;
      font-family: Avenir Next W01;
      font-size: 16px;
      font-weight: 700;
      height: 45px;
      padding: 12px 16px;
      transition-timing-function: cubic-bezier(0, 1, .75, 1);
      transition: background-color 300ms, color 300ms, border-color 300ms;

      &:hover {
        background-color: rgb(90, 90, 90);
        border-color: rgb(90, 90, 90);
      }
    `,
    type: {
      primary: css`
        background-color: rgb(186, 160, 130);
        border-color: rgb(186, 160, 130);

        &:hover {
          background-color: rgb(219, 189, 154);
          border-color: rgb(219, 189, 154);
        }
      `
    }
  }
}

const UniversalButton = styled.button`
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  ${props => props.theme.defaultStyles};
  ${props => props.theme.type[props.type]};
`

const Layout = styled.div`
  display: flex;

  & > div {
    height: 100vh;
    padding: 16px;
    width: 400px;

    &:first-child {
      border-right: 1px solid rgba(0, 0, 0, 0.5);
    }
  }
`

const H2 = styled.h2`
  font-family: sans-serif;
  margin: 0 0 16px 0;

  &:not(:first-child) {
    margin-top: 32px;
  }
`

const H3 = styled.h3`
  font-family: monospace;
`

export default class ButtonPage extends React.Component {
  state = {
    currentTheme: 'antd',
    currentType: undefined
  }

  render () {
    return (
      <div>
        <ThemeProvider theme={BUTTON_THEMES[this.state.currentTheme]}>
          <Layout>
            <div>
              <H2>Design System</H2>
              <SwitchGroup>
                {Object.keys(BUTTON_THEMES).map(theme => (
                  <Switch
                    active={theme === this.state.currentTheme}
                    onClick={() => this.setState({ currentTheme: theme })}
                  >
                    {theme}
                  </Switch>
                ))}
              </SwitchGroup>
              <H2>Props</H2>
              <H3>type</H3>
              <SwitchGroup>
                <Switch
                  active={this.state.currentType === undefined}
                  onClick={() => this.setState({ currentType: undefined })}
                >
                  undefined
                </Switch>
                {Object.keys(BUTTON_THEMES[this.state.currentTheme].type).map(type => (
                  <Switch
                    active={type === this.state.currentType}
                    onClick={() => this.setState({ currentType: type })}
                  >
                    {type}
                  </Switch>
                ))}
              </SwitchGroup>

            </div>
            <div>
              <UniversalButton
                type={this.state.currentType}
              >
                Default
              </UniversalButton>
            </div>
          </Layout>
        </ThemeProvider>
        <script src='http://fast.fonts.net/jsapi/e48efbf8-a486-4eb1-ba99-28266998779c.js' />
      </div>
    )
  }
}
