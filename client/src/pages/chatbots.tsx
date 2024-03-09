import { ChatBotItem, CreateBotBtn } from '@/components/pages/chatbots';
import { ROUTES } from '@/constants';
import { useNavigate } from 'react-router-dom';
import { createId } from '@paralleldrive/cuid2';
import { useDocumentTitle } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';

const Chatbots = () => {
   const navigate = useNavigate();
   const { t } = useTranslation('chatbots');

   useDocumentTitle(t('page_title'));

   return (
      <div className="p-6">
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <CreateBotBtn
               onCreate={() => {
                  navigate(`${ROUTES.PRIVATE.CHAT_BOT.INDEX}/${createId()}`);
               }}
            />
            <ChatBotItem chatbot={{ id: '1', name: 'Chatbot 1' }} />
            <ChatBotItem chatbot={{ id: '2', name: 'Chatbot 2' }} />
         </div>
      </div>
   );
};

export default Chatbots;
