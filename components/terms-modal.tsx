"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface TermsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TermsModal({ open, onOpenChange }: TermsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">TÉRMINOS Y CONDICIONES DE USO DE NINI.FUN</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Fecha de entrada en vigor: 20/10/25 • Última actualización: 24/10/25
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 text-sm">
          <p>
            Bienvenido/a a Nini.fun, una plataforma diseñada para que los usuarios ("Ninis") generen, distribuyan y
            moneticen contenido breve en colaboración con marcas. Al acceder o utilizar la plataforma, usted acepta
            estar sujeto a los presentes Términos y Condiciones ("Acuerdo"). Lea detenidamente este documento antes de
            utilizar el servicio.
          </p>

          <section>
            <h3 className="font-bold text-base mb-2">1. Aceptación de los términos</h3>
            <p>
              Al registrarse, acceder o utilizar la plataforma de Nini ("Plataforma" o "Servicio"), usted acepta de
              forma expresa e irrevocable los presentes Términos y Condiciones, así como cualquier normativa adicional
              aplicable. Si no está de acuerdo, deberá abstenerse de utilizar Nini.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-base mb-2">2. Naturaleza del servicio</h3>
            <p>
              Nini es una plataforma tecnológica que facilita la conexión entre marcas y creadores de contenido
              (usuarios) para producir y difundir contenido breve, ofreciendo:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Retos creativos o campañas propuestos por marcas.</li>
              <li>Paneles de usuario para cargar contenido.</li>
              <li>Sistemas de recompensas y gamificación.</li>
              <li>Herramientas de análisis y reputación.</li>
              <li>Integraciones con terceros (pagos, redes sociales, etc.).</li>
            </ul>
            <p className="mt-2">
              Nini no garantiza ingresos, visibilidad, ni acceso automático a campañas por el solo hecho de registrarse
              o subir contenido.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-base mb-2">3. Derechos reservados y autoridad total</h3>
            <p>
              Para preservar la integridad del sistema, el cumplimiento legal y la confianza de la comunidad, Nini se
              reserva el derecho, exclusivo y absoluto, de:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                Analizar, aprobar, desaprobar, eliminar, editar, ocultar o bloquear cualquier contenido, en cualquier
                momento y sin previo aviso.
              </li>
              <li>
                Suspender, restringir, desactivar o eliminar cuentas de usuario por cualquier motivo, sin necesidad de
                justificación ni aviso previo.
              </li>
              <li>
                Pausar, cancelar, retener, revocar o revisar pagos o recompensas por cualquier motivo, incluyendo (sin
                limitarse a): sospecha de fraude, contenido inadecuado, incumplimiento de normas, baja calidad, uso
                indebido de la plataforma, actividad automatizada o comportamiento no ético.
              </li>
              <li>Modificar, suspender o finalizar campañas, desafíos o dinámicas de monetización en cualquier momento.</li>
              <li>
                Cambiar los criterios de pago, visibilidad, reputación o participación sin necesidad de autorización ni
                consentimiento de los usuarios.
              </li>
            </ul>
            <p className="mt-2">
              El uso de Nini no otorga ningún derecho adquirido sobre pagos, participación, beneficios ni permanencia en
              la plataforma.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-base mb-2">4. Obligaciones del usuario</h3>
            <p>Usted se compromete a:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Subir únicamente contenido original o del cual posee todos los derechos necesarios.</li>
              <li>
                Cumplir con todas las leyes locales e internacionales sobre propiedad intelectual, privacidad y
                publicidad.
              </li>
              <li>No publicar contenido ofensivo, engañoso, ilegal, difamatorio, explícito o violento.</li>
              <li>
                No utilizar bots, automatizaciones, trampas o manipulaciones para obtener ventajas, visualizaciones o
                recompensas.
              </li>
              <li>Respetar las instrucciones de campañas, requisitos técnicos y políticas de calidad de Nini.</li>
            </ul>
            <p className="mt-2">
              El usuario es plenamente responsable de todo el contenido que publique y las consecuencias que de ello se
              deriven.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-base mb-2">5. Derechos de propiedad intelectual</h3>
            <p>
              El contenido que suba sigue siendo de su propiedad, sin embargo, al utilizar la plataforma, usted otorga a
              Nini una licencia irrevocable, mundial, perpetua, transferible, sublicenciable, sin regalías para usar,
              editar, distribuir, promocionar y monetizar dicho contenido, tanto dentro como fuera de la plataforma,
              para fines comerciales o promocionales.
            </p>
            <p className="mt-2">
              Toda propiedad intelectual de Nini (marca, software, diseño, sistemas, código, documentación) es propiedad
              exclusiva de Nini o sus afiliados.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-base mb-2">6. Pagos y recompensas</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Toda recompensa o pago está sujeta a revisión y autorización final por parte de Nini.</li>
              <li>No existe garantía alguna de que el contenido cargado será remunerado.</li>
              <li>Los pagos pueden ser retenidos, modificados o cancelados a criterio exclusivo de Nini.</li>
              <li>El sistema de recompensas puede cambiar sin previo aviso.</li>
              <li>
                Las métricas de rendimiento, calidad o viralidad pueden no reflejarse en compensaciones automáticas.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-base mb-2">7. Limitación de responsabilidad</h3>
            <p>En la máxima medida permitida por ley:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                Nini no será responsable por pérdidas económicas, daños, oportunidades no aprovechadas, eliminación de
                contenido, suspensión de cuentas o errores técnicos.
              </li>
              <li>
                Nini no asume responsabilidad por campañas, marcas, terceros, enlaces externos ni contenido generado por
                usuarios.
              </li>
              <li>
                El usuario renuncia a reclamar daños o perjuicios derivados del uso, mal uso, suspensión o modificación
                de los Servicios.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-base mb-2">8. Indemnización</h3>
            <p>
              Usted se compromete a indemnizar y eximir de responsabilidad a Nini, sus empleados, socios, afiliados y
              representantes frente a cualquier reclamación, daño, pérdida, multa o gasto (incluidos honorarios legales)
              derivado de:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>El uso que haga de la plataforma.</li>
              <li>El contenido que publique.</li>
              <li>El incumplimiento de estos Términos o cualquier ley aplicable.</li>
              <li>Su relación con marcas, terceros u otros usuarios.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-base mb-2">9. Modificaciones</h3>
            <p>
              Nini puede modificar estos Términos en cualquier momento. Los cambios entrarán en vigor una vez publicados.
              El uso continuado del servicio implica la aceptación de dichas modificaciones.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-base mb-2">10. Legislación y jurisdicción aplicable</h3>
            <p>
              Este acuerdo se regirá por las leyes de los Estados Unidos de América. Cualquier conflicto será resuelto en
              los tribunales competentes de Delaware.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-base mb-2">11. Contacto</h3>
            <p>Para consultas, reclamos o notificaciones legales:</p>
            <ul className="list-none space-y-1 mt-2">
              <li>Email: ayuda@nini.fun</li>
              <li>Entidad legal: Not Nini LLC</li>
              <li>Dirección: 8 The Green, Suite B, Dover, Zip Code 19901, Delaware.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-base mb-2">12. Cláusulas adicionales</h3>
            <div className="space-y-2">
              <div>
                <h4 className="font-semibold">A. Resolución de disputas por arbitraje</h4>
                <p>Toda controversia será resuelta mediante arbitraje vinculante, excluyendo procedimientos judiciales ordinarios.</p>
              </div>
              <div>
                <h4 className="font-semibold">B. Renuncia a acciones colectivas</h4>
                <p>El usuario renuncia al derecho de participar en demandas colectivas, representativas o conjuntas.</p>
              </div>
              <div>
                <h4 className="font-semibold">C. Investigación y auditoría</h4>
                <p>Nini se reserva el derecho de auditar cualquier comportamiento sospechoso y tomar medidas correctivas o legales.</p>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
