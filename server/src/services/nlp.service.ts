import { IIntents } from "@/interfaces/intents.interface";
import { NlpManager } from "node-nlp";
import path from "path";
import { Service } from "typedi";

@Service()
export class NlpService {
    public async train({ intents, referenceId }: {
        intents: Array<IIntents>,
        referenceId: string
    }) {
        const manager = new NlpManager({ languages: ['en'], forceNER: true });

        intents.forEach(it => {
            const { intent, prompts } = it;

            prompts.forEach(prompt => {
                manager.addDocument('en', prompt, intent);
            })
        });

        await manager.train();
        const file = process.cwd();
        console.log(file);
        await manager.save(path.join(process.cwd(), `\/src\/train_data\/${referenceId}.json`));
        console.log(path.join(process.cwd(), `\/train_data\/${referenceId}.json`));
        console.log('Trained for ' + referenceId + ' successfully');
    }
}