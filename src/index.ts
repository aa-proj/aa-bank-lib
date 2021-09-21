import axios from "axios"

async function getMoneyById(id: number | string): Promise<number> {
    const {data} = await axios.get(_GET_HOST() + id)
    if (!data.success) throw new Error(data.message)
    return data.amount
}


async function sendMoneyById(fromId: number | string, toId: number | string, amount: number, memo: string = ""): Promise<boolean> {
    const sendBody = {fromId: fromId.toString(), toId: toId.toString(), amount, memo}
    const {data} = await axios.post(_GET_HOST(), sendBody)
    if (!data.success) throw new Error(data.message)
    return true
}

async function generateMoneyById(toId: number | string, amount: number): Promise<boolean> {
    const result = await sendMoneyById("885834421771567125", toId, amount)
    return result
}

function _GET_HOST() {
    return process.env.AABANK_HOST || "http://hub.ahoaho.jp:9989/"
}

export {getMoneyById, sendMoneyById, generateMoneyById}