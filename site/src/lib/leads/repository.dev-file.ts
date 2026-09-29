import { randomUUID } from "node:crypto";
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import type { LeadRepository } from "./repository";
import type { Lead, NewLead } from "./types";

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE_PATH = path.join(DATA_DIR, "leads.dev.ndjson");

/**
 * Fallback SÓ de desenvolvimento — grava cada lead como uma linha JSON num
 * arquivo local gitignorado. Nunca é escolhido em produção (ver
 * `repository.ts`), justamente para não passar a falsa impressão de que
 * dados estão salvos de verdade quando não há banco configurado.
 */
export class DevFileLeadRepository implements LeadRepository {
  async save(lead: NewLead): Promise<Lead> {
    const now = new Date().toISOString();
    const record: Lead = { ...lead, id: randomUUID(), createdAt: now, updatedAt: now, status: "new" };

    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(FILE_PATH, `${JSON.stringify(record)}\n`, "utf-8");

    console.warn(`[leads:dev-file] Lead salvo em ${FILE_PATH} — isto NÃO é um banco de produção.`);

    return record;
  }
}
