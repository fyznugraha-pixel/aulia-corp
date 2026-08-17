import { getClientLogos } from '@/lib/services/clients.service';
import { ClientManager } from './ClientManager';

export default async function ClientsPage() {
  const clients = await getClientLogos();

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      <ClientManager initialClients={clients} />
    </div>
  );
}
