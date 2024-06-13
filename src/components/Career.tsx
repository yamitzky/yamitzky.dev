import React from 'react'
import { SectionTitle } from './SectionTitle'

type CareerItem = {
  startDate: string
  endDate: string
  title: string
}

const CareerItems: CareerItem[] = [
  { startDate: '2010.04', endDate: '2014.03', title: 'Waseda Univ. (Student)' },
  { startDate: '2014.04', endDate: '2015.12', title: 'CyberAgent' },
  { startDate: '2016.01', endDate: 'now', title: 'JX Press (CTO / Engineer)' },
]

export const Career: React.FC = () => {
  return (
    <section className="space-y-4" id="career">
      <SectionTitle icon="🍺">略歴</SectionTitle>
      <table>
        <tbody>
          {CareerItems.map((item, index) => (
            <tr key={index}>
              <td className="mr-4 text-slate-500 dark:text-gray-400 font-bold text-center">
                {item.startDate}
              </td>
              <td className="mr-4 pl-2 text-slate-500 dark:text-gray-400 font-bold">
                ➠
              </td>
              <td className="mr-4 pl-2 text-slate-500 dark:text-gray-400 font-bold text-center">
                {item.endDate}
              </td>
              <td className="pl-4">{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
