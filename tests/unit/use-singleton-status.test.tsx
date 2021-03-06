import React, { useEffect } from 'react'
import { render } from '@testing-library/react'
import * as module from '../../lib'
import { initTestSingletonClass } from '../mocks/mockedClassOne'
import { initTestSingletonClass as initTestSingletonClassWithDelay } from '../mocks/mockedClassTwo'

test('useSingletonStatus hook - in_progress', (done) => {
  const singleton = module.createSingleton()
  const TestSingletonOne = initTestSingletonClassWithDelay(
    singleton.setClass,
    singleton.watch
  )
  const useSingletonStatusSpy = jest.spyOn(module, 'useSingletonStatus')

  const TestApp = () => {
    const testSingleton = TestSingletonOne.getInstance()
    const status: module.Status = module.useSingletonStatus(TestSingletonOne)
    useEffect(() => {
      done()
    }, [status, testSingleton])
    return null
  }

  render(<TestApp />)
  expect(useSingletonStatusSpy).toReturnWith('in_progress')
})

test('useSingletonStatus hook - ready', () => {
  const singleton = module.createSingleton()
  const TestSingletonTwo = initTestSingletonClass(
    singleton.setClass,
    singleton.watch
  )
  const useSingletonStatusSpy = jest.spyOn(module, 'useSingletonStatus')

  const TestAppStateOne = () => {
    module.useSingletonStatus(TestSingletonTwo)

    return <div />
  }
  render(<TestAppStateOne />)
  expect(useSingletonStatusSpy).toReturnWith('ready')
})
