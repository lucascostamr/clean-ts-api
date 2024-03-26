import { type LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { LoadSurveysController } from './load-surveys-controller'
import { type SurveyModel } from '../../../../domain/models/survey'

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
  const loadSurveys = makeLoadSurveys()
  const sut = new LoadSurveysController(loadSurveys)
  return {
    sut,
    loadSurveys
  }
}

describe('Load Surveys Controller', () => {
  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveys } = makeSut()
    const loadSpy = jest.spyOn(loadSurveys, 'load')
    await sut.handle()
    expect(loadSpy).toHaveBeenCalled()
  })
})
