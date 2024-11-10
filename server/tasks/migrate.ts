import {spawnSync} from 'node:child_process'
export default defineTask({
    async run() {
        const storage = useStorage("scripts");
        console.log('keys', await storage.keys('scripts'))
        const restoreDump = await storage.get<string>("scripts:restore-dump.sh");
        if (!restoreDump) {
            throw new Error("No restore dump script found");
        }
        spawnSync(restoreDump, [], { stdio: 'inherit', shell: true  })
        return { result: "success" };
    },
});
