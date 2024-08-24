import React from 'react';
import './TerminosyCondiciones.css'; // Asegúrate de que este archivo contenga los estilos

const TerminosYCondiciones = ({ onAccept }) => { // Cambié 'OnAccept' a 'onAccept'
    return (
        <div className="terminos-container">
            <h2>Términos y Condiciones</h2>
            <div className="terminos-content">
                <div>
                    <h4>Aceptación de los Términos:</h4>
                    <p>
                        Al acceder o utilizar nuestro sitio web, aplicación o servicios, usted acepta cumplir con estos términos y condiciones. Si no está de acuerdo con estos términos, por favor no utilice nuestros servicios.
                    </p>
                </div>
                <div>
                    <h4>Modificación de los Términos:</h4>
                    <p>
                        Nos reservamos el derecho de modificar estos términos en cualquier momento. Cualquier cambio será efectivo inmediatamente después de la publicación. Le recomendamos que revise regularmente esta página para estar al tanto de cualquier actualización.
                    </p>
                </div>
                <div>
                    <h4>Uso del Servicio:</h4>
                    <p>
                        El uso de nuestro servicio es bajo su propio riesgo. Usted es responsable de cualquier actividad realizada bajo su cuenta y debe asegurarse de que cualquier información que proporcione sea precisa y esté actualizada.
                    </p>
                </div>
                <div>
                    <h4>Propiedad Intelectual:</h4>
                    <p>
                        Todo el contenido disponible en nuestro sitio web o aplicación, incluyendo textos, gráficos, logos, imágenes y software, es propiedad de nuestra empresa o de nuestros licenciantes y está protegido por leyes de derechos de autor y propiedad intelectual.
                    </p>
                </div>
                <div>
                    <h4>Prohibiciones:</h4>
                    <ul>
                        <li>Reproducir, duplicar, copiar o revender cualquier parte de nuestro servicio sin nuestra autorización.</li>
                        <li>Utilizar el servicio para actividades fraudulentas o ilegales.</li>
                        <li>Interferir o intentar interferir con el funcionamiento adecuado del servicio.</li>
                    </ul>
                </div>
                <div>
                    <h4>Limitación de Responsabilidad:</h4>
                    <p>
                        En ningún caso seremos responsables por cualquier daño directo, indirecto, incidental o consecuente que surja del uso o la incapacidad de uso de nuestro servicio, incluso si hemos sido advertidos de la posibilidad de tales daños.
                    </p>
                </div>
                <div>
                    <h4>Privacidad:</h4>
                    <p>
                        La recopilación y el uso de su información personal se rige por nuestra Política de Privacidad. Al usar nuestro servicio, usted acepta la recopilación y uso de esta información conforme a la política.
                    </p>
                </div>
                <div>
                    <h4>Terminación:</h4>
                    <p>
                        Nos reservamos el derecho de suspender o terminar su acceso a nuestro servicio en cualquier momento, sin previo aviso, por cualquier motivo, incluyendo, entre otros, el incumplimiento de estos términos.
                    </p>
                </div>
                <div>
                    <h4>Ley Aplicable:</h4>
                    <p>
                        Estos términos se regirán e interpretarán de acuerdo con las leyes aplicables en nuestro país. Cualquier disputa que surja en relación con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales locales.
                    </p>
                </div>
                <div>
                    <h4>Contacto:</h4>
                    <p>
                        Si tiene alguna pregunta sobre estos términos, por favor contáctenos a través de nuestro correo electrónico o en nuestra dirección física.
                    </p>
                </div>
            </div>
            <button className="aceptar-boton" onClick={onAccept}>Aceptar Términos y Condiciones</button> {/* Cambié 'OnAccept' a 'onAccept' */}
        </div>
    );
};

export default TerminosYCondiciones;
