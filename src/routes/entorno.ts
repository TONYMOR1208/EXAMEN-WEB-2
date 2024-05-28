// src/routes/entorno.ts
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

type Entity = 'entorno' | 'transaccion' | 'otraEntidad';

async function modificarEntorno(nombreEntidad: Entity, idElemento: number, idEntorno: number) {
  try {
    if (!['entorno', 'transaccion', 'otraEntidad'].includes(nombreEntidad)) {
      throw new Error('Nombre de entidad no válido.');
    }

    await prisma[nombreEntidad].update({
      where: { id: idElemento },
      data: {
        entorno: { connect: { id: idEntorno } }
      }
    });

    console.log(`Entorno del elemento ${nombreEntidad} con ID ${idElemento} modificado correctamente.`);
  } catch (error) {
    console.error('Error al modificar el entorno del elemento:', error);
    throw error;
  }
}

router.put('/:entidad/:id/:idEntorno', async (req: Request, res: Response) => {
  const { entidad, id, idEntorno } = req.params;
  try {
    await modificarEntorno(entidad as Entity, parseInt(id), parseInt(idEntorno));
    res.status(200).json({ message: `Entorno del elemento ${entidad} con ID ${id} actualizado correctamente.` });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar el entorno del elemento', error: error.message });
  }
});

export default router;
