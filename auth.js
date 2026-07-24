// ============================================================
// AUTH MODAL + FIREBASE EMAIL/PASSWORD AUTHENTICATION
// ============================================================

// ---------- Elements ----------
const authOverlay   = document.getElementById('authOverlay');
const authClose      = document.getElementById('authClose');
const authTabs       = document.getElementById('authTabs');
const authTabBtns    = document.querySelectorAll('.auth-tab');
const authPanels     = document.querySelectorAll('.auth-panel');

const loginNavBtn    = document.getElementById('loginNavBtn');
const userChip       = document.getElementById('userChip');
const userChipBtn    = document.getElementById('userChipBtn');
const userDropdown   = document.getElementById('userDropdown');
const userAvatar     = document.getElementById('userAvatar');
const userName       = document.getElementById('userName');
const logoutBtn      = document.getElementById('logoutBtn');

const loginPanel     = document.getElementById('loginPanel');
const signupPanel    = document.getElementById('signupPanel');
const forgotPanel    = document.getElementById('forgotPanel');

const loginNote      = document.getElementById('loginNote');
const signupNote     = document.getElementById('signupNote');
const forgotNote     = document.getElementById('forgotNote');

const forgotLink     = document.getElementById('forgotLink');
const backToLogin    = document.getElementById('backToLogin');

// ---------- Helpers ----------
function openAuthModal(tab = 'login') {
  authOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  switchTab(tab);
}

function closeAuthModal() {
  authOverlay.classList.remove('open');
  document.body.style.overflow = '';
  clearNotes();
}

function switchTab(tab) {
  authTabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab));
  authPanels.forEach(panel => panel.classList.remove('active'));
  document.getElementById(tab + 'Panel').classList.add('active');
  authTabs.style.display = tab === 'forgot' ? 'none' : 'flex';
  clearNotes();
}

function clearNotes() {
  [loginNote, signupNote, forgotNote].forEach(n => {
    n.textContent = '';
    n.className = 'auth-note';
  });
}

function showNote(el, message, type = 'error') {
  el.textContent = message;
  el.className = 'auth-note ' + type;
}

function friendlyError(err) {
  const map = {
    'auth/invalid-email': 'That email address looks invalid.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with that email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/missing-password': 'Please enter a password.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Check your connection.'
  };
  return map[err.code] || err.message || 'Something went wrong. Please try again.';
}

function setButtonLoading(form, loading) {
  const btn = form.querySelector('button[type="submit"]');
  if (!btn) return;
  if (loading) {
    btn.dataset.originalText = btn.textContent;
    btn.textContent = 'Please wait…';
    btn.disabled = true;
  } else {
    btn.textContent = btn.dataset.originalText || btn.textContent;
    btn.disabled = false;
  }
}

function initials(nameOrEmail) {
  if (!nameOrEmail) return 'U';
  const source = nameOrEmail.includes('@') ? nameOrEmail.split('@')[0] : nameOrEmail;
  return source.trim().charAt(0).toUpperCase();
}

// ---------- Open / close modal ----------
loginNavBtn.addEventListener('click', () => openAuthModal('login'));
authClose.addEventListener('click', closeAuthModal);
authOverlay.addEventListener('click', (e) => {
  if (e.target === authOverlay) closeAuthModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && authOverlay.classList.contains('open')) closeAuthModal();
});

// ---------- Tabs ----------
authTabBtns.forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});
forgotLink.addEventListener('click', (e) => {
  e.preventDefault();
  switchTab('forgot');
});
backToLogin.addEventListener('click', (e) => {
  e.preventDefault();
  switchTab('login');
});

// ---------- Signup ----------
signupPanel.addEventListener('submit', (e) => {
  e.preventDefault();
  clearNotes();

  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;

  setButtonLoading(signupPanel, true);

  auth.createUserWithEmailAndPassword(email, password)
    .then((cred) => cred.user.updateProfile({ displayName: name }))
    .then(() => {
      showNote(signupNote, 'Account created! You are now logged in.', 'success');
      setTimeout(closeAuthModal, 900);
      signupPanel.reset();
    })
    .catch((err) => showNote(signupNote, friendlyError(err)))
    .finally(() => setButtonLoading(signupPanel, false));
});

// ---------- Login ----------
loginPanel.addEventListener('submit', (e) => {
  e.preventDefault();
  clearNotes();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  setButtonLoading(loginPanel, true);

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      showNote(loginNote, 'Logged in successfully!', 'success');
      setTimeout(closeAuthModal, 700);
      loginPanel.reset();
    })
    .catch((err) => showNote(loginNote, friendlyError(err)))
    .finally(() => setButtonLoading(loginPanel, false));
});

// ---------- Forgot Password ----------
forgotPanel.addEventListener('submit', (e) => {
  e.preventDefault();
  clearNotes();

  const email = document.getElementById('forgotEmail').value.trim();

  setButtonLoading(forgotPanel, true);

  auth.sendPasswordResetEmail(email)
    .then(() => {
      showNote(forgotNote, 'Reset link sent! Check your inbox.', 'success');
      forgotPanel.reset();
    })
    .catch((err) => showNote(forgotNote, friendlyError(err)))
    .finally(() => setButtonLoading(forgotPanel, false));
});

// ---------- Logout ----------
logoutBtn.addEventListener('click', () => {
  auth.signOut();
  userDropdown.classList.remove('open');
});

// ---------- User chip dropdown ----------
userChipBtn.addEventListener('click', () => {
  userDropdown.classList.toggle('open');
});
document.addEventListener('click', (e) => {
  if (!userChip.contains(e.target)) userDropdown.classList.remove('open');
});

// ---------- Auth state: update navbar ----------
function updateNavbarForUser(user) {
  if (user) {
    loginNavBtn.hidden = true;
    loginNavBtn.style.display = 'none';       // force-hide even if something else sets `hidden` back
    userChip.hidden = false;
    userChip.style.display = '';
    const displayName = user.displayName || user.email;
    userName.textContent = displayName;
    userAvatar.textContent = initials(displayName);
  } else {
    loginNavBtn.hidden = false;
    loginNavBtn.style.display = '';
    userChip.hidden = true;
    userChip.style.display = 'none';
    userDropdown.classList.remove('open');
  }
}

// Run once immediately with whatever Firebase already has cached (covers the
// gap before onAuthStateChanged fires for the first time on page load).
updateNavbarForUser(auth.currentUser);

auth.onAuthStateChanged((user) => {
  updateNavbarForUser(user);
});
