import 'vant/lib/index.css'
import { ConfigProvider, Col, Row } from 'vant'

const useVant = (app: any) => {
  app.use(ConfigProvider)
  app.use(Col)
  app.use(Row)
}

export default useVant