type category = 'ing' | 'mat' | 'com' | 'fis'

interface Question {
  id: string
  text: string
  answers: Record<'a' | 'b' | 'c' | 'd', string>
  correct: 'a' | 'b' | 'c' | 'd'
}

export type QuestionsData = Record<category, Question[]>

export async function getRandomQuestions(): Promise<QuestionsData> {
  return getPlaceholderQuestions()
}

function getPlaceholderQuestions() {
  const sample: Question = {
      id: '123',
      text: 'abc',
      answers: {
        a: 'Answer A',
        b: 'Answer B',
        c: 'Answer C',
        d: 'Answer D'
      },
      correct: 'd'
    },
    arr = []

  for (let i = 0; i < 5; i++) arr.push(sample)

  return {
    ing: arr,
    mat: arr,
    com: arr,
    fis: arr
  }
}
