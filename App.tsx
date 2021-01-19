import React, { useState } from 'react'
import { LayoutRectangle, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { NativeRouter, Route, Switch } from 'react-router-native'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import { HOME_ROUTE, TEMPLATES_ROUTE } from './src/constants/routes'
import { COLOR_BLACK, COLOR_DARK_GRAY } from './src/constants/colors'

import AuthProvider from './src/contexts/AuthProvider'
import BillsProvider from './src/contexts/BillsProvider'

import BottomBar from './src/components/UI/BottomBar'

import Home from './src/screens/Home'
import Templates from './src/screens/Templates'

dayjs.extend(customParseFormat)
dayjs.locale('pt-br')

const s = StyleSheet.create({
  safeAreaView: {
    backgroundColor: COLOR_DARK_GRAY
  },

  routerWrapper: {
    minHeight: '100%'
  }
})

// TODO app icon
// TODO change app name to BillsBillsBills
export default function App() {
  const [bottomBarLayout, setBottomBarLayout] = useState<LayoutRectangle>()

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor={COLOR_BLACK} />
      <SafeAreaView style={s.safeAreaView}>
        <AuthProvider>
          <BillsProvider>
            <NativeRouter
              // initialEntries={['/templates']}
            >
              <View style={[s.routerWrapper, { paddingBottom: bottomBarLayout?.height ?? 0 }]}>
                <Switch>
                  <Route exact path={HOME_ROUTE} component={Home} />
                  <Route path={TEMPLATES_ROUTE} component={Templates} />
                </Switch>
                <BottomBar onLayout={setBottomBarLayout} />
              </View>
            </NativeRouter>
          </BillsProvider>
        </AuthProvider>
      </SafeAreaView>
    </>
  )
}
