import {actions} from '@/plugins/vuex/actions'
import axios from 'axios'
import {formatResult} from "../../../../../src/plugins/vuex/results/results";

jest.mock('axios')

describe('vuex/profile/actions', () => {
    test('logoutAsync calls logout and setResult commits on server resolved', () => {
        expect.hasAssertions()

        const r = {status: 200}
        axios.post.mockResolvedValueOnce(r)

        const context = {
            commit: jest.fn(),
            state: {profile: "test"}
        }

        return actions.logoutAsync(context, {
            onSuccess: r =>
                expect(context.commit.mock.calls).toEqual([
                    ['setResult', {resultObject: formatResult('logout', r)}],
                    ['logout']
                ])
        })
    })

    test('logoutAsync calls logout and setResult commits on server rejected', () => {
        expect.hasAssertions()

        const r = {status: 400}
        axios.post.mockRejectedValue(r)

        const context = {
            commit: jest.fn(),
            state: {profile: "test"}
        }

        return actions.logoutAsync(context, {
            onFail: r => expect(context.commit.mock.calls).toEqual([
                ['setResult', {resultObject: formatResult('logout', r)}],
                ['logout']
            ])
        })
    })

    test('signupAsync calls setResult commit on server resolved', () => {
        expect.hasAssertions()

        const r = {status: 200}
        axios.post.mockResolvedValue(r)

        const context = {
            commit: jest.fn(),
        }

        return actions.signupAsync(context, {
            profile: {
                name: {firstName: "firstName", lastName: "lastName"},
                email: "email", password: "password"
            },
            onSuccess: r => expect(context.commit.mock.calls).toEqual([
                ['setResult', {resultObject: formatResult('register', r)}],
            ])
        })
    })

    test('signupAsync calls setResult commit on server rejected', () => {
        expect.hasAssertions()

        const r = {status: 400}
        axios.post.mockRejectedValue(r)

        const context = {
            commit: jest.fn(),
        }

        return actions.signupAsync(context, {
            profile: {
                name: {firstName: "firstName", lastName: "lastName"},
                email: "email", password: "password"
            },
            onFail: r => expect(context.commit.mock.calls).toEqual([
                ['setResult', {resultObject: formatResult('register', r)}],
            ])
        })
    })

    // TODO: login, user, reset, setresult, removeresult, profilechangeproperty, adddatabricks
});
