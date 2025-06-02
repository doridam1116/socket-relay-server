export function validateClient({ companyCode, storeCode }) {
    if (!companyCode) {
        return { valid: false, reason: 'companyCode 누락' };
    } else if (!storeCode) {
        return { valid: false, reason: 'storeCode 누락' };
    }

    // TODO: 운영 시에는 DB 또는 토큰 기반 인증 검사를 여기에 추가

    return { valid: true };
}