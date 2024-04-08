import { type LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { LoadSurveysController } from './load-surveys-controller'
import { type SurveyModel } from '../../../../domain/models/survey'
import { noContent, ok, serverError } from '../../../helpers/http/http-helper'
import mockDate from 'mockdate'

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await new Promise(resolve => { resolve(makeFakeSurveys()) })
    }
  }
  return new LoadSurveysStub()
}

const makeFakeSurveys = (): SurveyModel[] => ([{
  id: 'any_id',
  question: 'any_question',
  answers: [{ image: 'any_image', answer: 'any_answer' }],
  date: new Date()
}])

const makeSut = (): any => {
  const loadSurveysStub = makeLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('Load Surveys Controller', () => {
  beforeAll(() => {
    mockDate.set(new Date())
  })

  afterAll(() => {
    mockDate.reset()
  })

  test('Should call LoadSurveysUseCases', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on LoadSurveysUseCases success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle()
    expect(response).toEqual(ok(makeFakeSurveys()))
  })

  test('Should return 204 if LoadSurveysUseCases returns empty array', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockResolvedValueOnce([])
    const response = await sut.handle()
    expect(response).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveysUseCases throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockRejectedValueOnce(new Error())
    const response = await sut.handle()
    expect(response).toEqual(serverError(new Error()))
  })
})
