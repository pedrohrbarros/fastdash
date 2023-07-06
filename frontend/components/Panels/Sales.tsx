import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import Button from '../Button'
import { useState } from 'react'

function SalesPanel() {

  const { t } = useTranslation('comercial')

  const [addInputActive, setAddInputActive] = useState(false)

  const renderAddInput = () => {
    if (addInputActive) {
      return (
        <tr>
          <td>
          </td>
          <td>
            <input
            type="text"
            name="name"
            id="name"
            />
          </td>
        </tr>
      )
    }
  }

  return (
    <motion.table
    initial={{
      x: 500,
    }}
    animate={{
      x: 0
    }}
    exit={{
      x:-500
    }}
    className="w-full h-full"
    >
      <thead>
        <tr>
          <th className="font-p font-bold text-black text-xl max-[500px]:text-sm pb-6">ID</th>
          <th className="font-p font-bold text-black text-xl max-[500px]:text-sm pb-6">{t('Product')}</th>
          <th className="font-p font-bold text-black text-xl max-[500px]:text-sm pb-6">{t('Seller')}</th>
          <th className="font-p font-bold text-black text-xl max-[500px]:text-sm pb-6">{t('Sold at')}</th>
        </tr>
      </thead>
      {renderAddInput()}
      <tfoot>
        <td className="w-3 max-[500px]:w-1">
          <Button
          color="bg-purple-900"
          text='+'
          onClick={() => setAddInputActive(true)}
          />
        </td>
      </tfoot>
    </motion.table>
  )
}

export default SalesPanel