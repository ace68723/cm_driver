import CmDriverConstants from '../Constants/CmDriverConstants';
import {dispatch, register} from '../Dispatchers/CmDriverDispatcher';
import HistoryModule from '../Modules/HistoryModule/CmDriverHistoryModule';
import {NativeModules} from 'react-native';
export default {
    async getOrders(){
      try{
          // const token = await AuthModule.getToken();
          // const reqData = {rid,pretax,token,startAmount}
          const result = await HistoryModule.getHistory();
          if (result.ev_error == 0) {
            const data = result.ev_orders;
            dispatch({
                actionType: CmDriverConstants.GET_HISTORY, data
            })
          }
      }catch (e){
      }
    },

}
