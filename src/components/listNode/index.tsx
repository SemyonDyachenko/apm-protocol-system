import { motion } from "framer-motion"
import React from "react"

type Props = {
  classname?: string
  children: React.ReactNode
}

const ListNode = ({ classname, children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.05 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div
        className={`mb-2 w-full rounded-[10px] border-[1px] border-gray-80 bg-gray-70  shadow-sm transition hover:bg-gray-80`}
      >
        <div
          className={`mx-4 flex items-center justify-between py-2 md:px-10 ${classname}`}
        >
          {children}
        </div>
      </div>
    </motion.div>
  )
}

export default ListNode
