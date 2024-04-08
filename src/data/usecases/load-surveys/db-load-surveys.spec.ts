import { type SurveyModel, type LoadSurveysRepository } from './db-load-surveys-protocols'
import { DbLoadSurveys } from './db-load-surveys'
import mockDate from 'mockdate'

const makeLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async load (): Promise<SurveyModel[]> {
      return await new Promise(resolve => { resolve(makeFakeSurveys()) })
    }
  }
  return new LoadSurveysRepositoryStub()
}

const makeFakeSurveys = (): SurveyModel[] => ([{
  id: 'any_id',
  question: 'any_question',
  answers: [{ image: 'any_image', answer: 'any_answer' }],
  date: new Date()
}])

interface SutTypes {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => { mockDate.set(new Date()) })

  afterAll(() => { mockDate.reset() })

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'load')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'load').mockRejectedValueOnce(new Error())
    const response = sut.load()
    await expect(response).rejects.toThrow(new Error())
  })

  test('Should return an empty array if LoadSurveysRepository load fails', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'load').mockResolvedValueOnce([])
    const response = await sut.load()
    expect(response).toEqual([])
  })

  test('Should return surveys list on LoadSurveysRepository load success', async () => {
    const { sut } = makeSut()
    const response = await sut.load()
    expect(response).toEqual(makeFakeSurveys())
  })
})
