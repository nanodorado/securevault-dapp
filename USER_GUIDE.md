# 📖 Guía de Usuario - SecureVault dApp

## 🎯 ¿Qué es SecureVault?

SecureVault es un **vault multi-firma** en Ethereum que requiere la aprobación de múltiples propietarios (owners) para ejecutar transacciones. Combina seguridad multifirma con un timelock para máxima protección.

### Características:
- ✅ **Multi-firma**: Requiere múltiples aprobaciones
- ✅ **Timelock**: Delay obligatorio antes de ejecutar
- ✅ **Pausable**: Función de emergencia
- ✅ **Transparente**: Todo verificable en blockchain

---

## 🚀 Inicio Rápido

### 1. Conectar Wallet

1. Abre la app: https://securevault-dapp.vercel.app
2. Asegúrate de tener MetaMask instalado
3. Cambia a **Sepolia Testnet** en MetaMask
4. Haz clic en **"Connect Wallet"**
5. Aprueba la conexión en MetaMask (solo una vez)

### 2. Ver Dashboard

En la pestaña **Dashboard** verás:
- 💰 **Balance del vault**
- 👥 **Lista de owners**
- ⚙️ **Configuración**:
  - Número de aprobaciones requeridas
  - Tiempo del timelock
  - Total de transacciones

---

## 📋 Flujo Completo de Transacción

### Paso 1: Proponer Transacción (Owner)

1. Ve a la pestaña **"Propose Transaction"**
2. Ingresa la **dirección destino**
3. Ingresa la **cantidad en ETH**
4. Clic en **"Propose Transaction"**
5. Confirma en MetaMask
6. ✅ Propuesta creada!

### Paso 2: Aprobar (Owners)

1. Ve a la pestaña **"Transactions"**
2. Encuentra tu transacción propuesta
3. Clic en botón **"Approve"**
4. Confirma en MetaMask
5. Repite con otros owners hasta alcanzar el mínimo de aprobaciones

### Paso 3: Queue (Cualquier Owner)

1. Cuando la transacción tenga suficientes aprobaciones
2. El botón **"Queue"** se habilitará
3. Clic en **"Queue"**
4. Confirma en MetaMask
5. La transacción entra en timelock

### Paso 4: Esperar Timelock

- ⏰ Debes esperar el tiempo configurado (ej: 1 hora)
- La app muestra el tiempo restante
- Esto previene retiros maliciosos inmediatos

### Paso 5: Ejecutar (Cualquier Owner)

1. Después de que expire el timelock
2. El botón **"Execute"** se habilitará
3. Clic en **"Execute"**
4. Confirma en MetaMask
5. ✅ ETH enviado al destinatario!

---

## 🎨 Interfaz de Usuario

```
┌──────────────────────────────────────────────────┐
│ 🔐 SecureVault        [Connected: 0x1234...5678] │
├──────────────────────────────────────────────────┤
│                                                  │
│  [Dashboard] [Propose Transaction] [Transactions]│
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │                                            │ │
│  │         Contenido según pestaña            │ │
│  │                                            │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  Contract: 0xa6Db...99CC | View on Etherscan    │
└──────────────────────────────────────────────────┘
```

---

## 📊 Estados de Transacción

| Estado | Descripción | Acciones Disponibles |
|--------|-------------|---------------------|
| 🟡 **Pending** | Esperando aprobaciones | Approve, Cancel |
| 🟢 **Approved** | Suficientes firmas | Queue |
| 🔵 **Queued** | En timelock | Cancel, o esperar |
| ⏰ **Ready** | Timelock expirado | Execute |
| ✅ **Executed** | Completada | Ver en Etherscan |
| ❌ **Cancelled** | Cancelada | - |

---

## 💰 Depositar ETH en el Vault

### Opción 1: Desde MetaMask

1. Abre MetaMask
2. Clic en **"Send"**
3. Pega la dirección del vault:
   ```
   0xa6Db445e0ef1f0d4e18A9C0c848713D4381699CC
   ```
4. Ingresa la cantidad en ETH
5. Confirma la transacción
6. ✅ ETH depositado!

### Opción 2: Desde Etherscan

1. Ve a [Etherscan](https://sepolia.etherscan.io/address/0xa6Db445e0ef1f0d4e18A9C0c848713D4381699CC)
2. Pestaña **"Contract"** → **"Write Contract"**
3. Conecta tu wallet
4. Función **"deposit"** (payable)
5. Ingresa cantidad en ETH
6. Clic **"Write"**

---

## 🔐 Seguridad y Roles

### Roles

- **Owner**: Puede proponer, aprobar, queue y ejecutar transacciones
- **No-Owner**: Solo puede ver el dashboard (modo lectura)

### Flujo de Seguridad

```
Propuesta → Aprobar (múltiples) → Queue → Timelock → Ejecutar
   ↓           ↓                     ↓         ↓         ↓
Owner 1    Owner 2+3             Owner    Espera    Owner
```

### Ventajas del Multi-Sig + Timelock

✅ **Previene robos**: Un owner comprometido no puede robar fondos  
✅ **Previene errores**: Múltiples revisiones antes de ejecutar  
✅ **Ventana de reacción**: Timelock da tiempo para detectar problemas  
✅ **Transparente**: Todo registrado en blockchain  

---

## 🆘 Funciones de Emergencia

### Pausar el Vault

Si detectas actividad sospechosa:

1. Ve a la pestaña **"Transactions"**
2. Busca función **"Pause"** (si está disponible en UI)
3. O usa Etherscan → Write Contract → `pause()`
4. Confirma en MetaMask
5. ⏸️ Todas las operaciones bloqueadas

### Reanudar (Unpause)

Cuando la situación esté resuelta:

1. Usa función `unpause()`
2. Confirma con suficientes owners
3. ▶️ Operaciones restauradas

---

## 📱 Ejemplo Práctico Completo

### Escenario: Retirar 0.5 ETH para pagar un servicio

**Setup:**
- 3 owners: Alice, Bob, Charlie
- Requiere 2 aprobaciones
- Timelock: 1 hora

**Paso a paso:**

#### Day 1 - 10:00 AM
**Alice** (Owner 1):
```
1. Connect Wallet
2. Propose Transaction
   - To: 0xServicio123...
   - Amount: 0.5 ETH
3. Submit → TX #5 creada
```

#### Day 1 - 11:00 AM
**Bob** (Owner 2):
```
1. Connect Wallet
2. Transactions tab
3. Find TX #5
4. Click "Approve"
5. Confirm in MetaMask
   Status: Pending (1/2 approvals)
```

#### Day 1 - 2:00 PM
**Charlie** (Owner 3):
```
1. Connect Wallet
2. Transactions tab
3. Find TX #5
4. Click "Approve"
5. Confirm in MetaMask
   Status: Approved (2/2 ✅)
```

#### Day 1 - 2:05 PM
**Alice** (cualquier owner):
```
1. Transactions tab
2. TX #5 → "Queue" button enabled
3. Click "Queue"
4. Confirm in MetaMask
   Status: Queued (wait 1 hour)
```

#### Day 1 - 3:06 PM (1 hora después)
**Bob** (cualquier owner):
```
1. Transactions tab
2. TX #5 → "Execute" button enabled
3. Click "Execute"
4. Confirm in MetaMask
   Status: Executed ✅
   0.5 ETH → 0xServicio123...
```

---

## 🔄 Actualizaciones en Tiempo Real

La app se actualiza automáticamente cada **10 segundos**:

- 💰 Balance del vault
- 📊 Estado de transacciones
- 👥 Lista de owners
- ⏰ Tiempo restante del timelock

También puedes refrescar manualmente recargando la página.

---

## 🌐 Información del Contrato

### Sepolia Testnet

- **Contrato SecureVault**: `0xa6Db445e0ef1f0d4e18A9C0c848713D4381699CC`
- **TimelockController**: `0xAACD4f270A9DC3f014FFE7AdC7bd6e4A9820C702`
- **Red**: Sepolia Testnet (Chain ID: 11155111)

### Enlaces Útiles

- 🔍 [Ver en Etherscan](https://sepolia.etherscan.io/address/0xa6Db445e0ef1f0d4e18A9C0c848713D4381699CC)
- 💻 [Código fuente (Backend)](https://github.com/nanodorado/evm_secure_vault)
- 🎨 [Código fuente (Frontend)](https://github.com/nanodorado/securevault-dapp)
- 🚰 [Sepolia Faucet](https://sepoliafaucet.com)

---

## 🛠️ Solución de Problemas

### ❌ "MetaMask is not installed"

**Solución:** Instala [MetaMask](https://metamask.io/)

### ❌ "Wrong network"

**Solución:** Cambia a Sepolia Testnet en MetaMask
1. MetaMask → Network dropdown
2. Selecciona "Sepolia test network"
3. Si no aparece, Settings → Advanced → "Show test networks"

### ❌ "Insufficient funds"

**Solución:** Necesitas ETH de Sepolia
- Ve a [Sepolia Faucet](https://sepoliafaucet.com)
- Pega tu dirección
- Solicita testnet ETH (gratis)

### ❌ "Not an owner"

**Solución:** Solo los owners pueden proponer/aprobar
- Verifica en el Dashboard si eres owner
- Si no lo eres, contacta a un owner para agregarte

### ❌ "Pending request"

**Solución:** Ya hay una solicitud en MetaMask
1. Abre MetaMask
2. Busca notificación pendiente
3. Aprueba o rechaza
4. Refresca la página

### ❌ Transacción stuck en "Connecting..."

**Solución:**
1. Refresca la página
2. No hagas clic múltiples veces
3. Espera a que aparezca el popup de MetaMask
4. Si no aparece, verifica que los popups no estén bloqueados

---

## 💡 Mejores Prácticas

### Para Owners

✅ **Verifica direcciones**: Siempre verifica la dirección destino  
✅ **Cantidades correctas**: Revisa dos veces los montos  
✅ **Comunícate**: Coordina con otros owners  
✅ **Actúa rápido**: Aprueba transacciones legítimas pronto  
✅ **Cuestiona**: Si algo parece raro, pregunta primero  

### Seguridad

✅ **Guarda tu seed phrase**: Nunca la compartas  
✅ **Verifica URLs**: Solo usa la URL oficial de Vercel  
✅ **No compartas pantalla**: Al aprobar transacciones  
✅ **Usa hardware wallet**: Para producción (Ledger, Trezor)  
✅ **Revisa en Etherscan**: Verifica transacciones importantes  

---

## 📞 Soporte y Ayuda

### Recursos

- 📖 **Documentación**: README.md en los repos de GitHub
- 🔍 **Explorador**: Etherscan para verificar transacciones
- 💬 **Issues**: GitHub Issues para reportar problemas

### Preguntas Frecuentes

**P: ¿Cuánto cuesta usar el vault?**  
R: Solo pagas gas de Sepolia (testnet = gratis)

**P: ¿Puedo cambiar los owners?**  
R: Sí, mediante funciones del contrato (requiere multisig)

**P: ¿Qué pasa si pierdo acceso a mi wallet?**  
R: Los otros owners pueden seguir operando el vault

**P: ¿Puedo cancelar una transacción?**  
R: Sí, antes de ejecutarla (requiere aprobación multisig)

**P: ¿Es seguro para producción?**  
R: Este es testnet. Para mainnet, haz auditoría profesional primero.

---

## 🎓 Próximos Pasos

1. ✅ **Practica en testnet**: Haz transacciones de prueba
2. ✅ **Comparte con owners**: Envíales esta guía
3. ✅ **Deposita fondos**: Solo lo que estés dispuesto a testear
4. ✅ **Realiza pruebas**: Todo el flujo completo
5. ✅ **Audita**: Antes de usar en mainnet

---

## 📄 Licencia

MIT License - Código abierto

---

**¡Bienvenido a SecureVault!** 🚀🔐

Tu solución de custody multi-firma en Ethereum.
